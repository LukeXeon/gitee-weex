package com.luke.gitee;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.luke.gitee.extend.HotReloadManager;
import com.luke.gitee.util.AppConfig;
import com.luke.gitee.util.Constants;

import org.apache.weex.WXEnvironment;
import org.apache.weex.WXSDKEngine;
import org.apache.weex.WXSDKInstance;
import org.apache.weex.common.WXErrorCode;
import org.apache.weex.ui.component.NestedContainer;
import org.apache.weex.utils.WXLogUtils;
import org.apache.weex.utils.WXSoInstallMgrSdk;
import org.json.JSONException;
import org.json.JSONObject;


public class WXPageActivity extends AbsWeexActivity implements
    WXSDKInstance.NestedInstanceInterceptor {

  private static final String TAG = "WXPageActivity";
  private ProgressBar mProgressBar;
  private TextView mTipView;
  private boolean mFromSplash = false;
  private HotReloadManager mHotReloadManager;

  @Override
  public void onCreateNestInstance(WXSDKInstance instance, NestedContainer container) {
    Log.d(TAG, "Nested Instance created.");
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_wxpage);
    mContainer = (ViewGroup) findViewById(R.id.container);
    mProgressBar = (ProgressBar) findViewById(R.id.progress);
    mTipView = (TextView) findViewById(R.id.index_tip);

    Intent intent = getIntent();
    Uri uri = intent.getData();
    String from = intent.getStringExtra("from");
    mFromSplash = "splash".equals(from);

    if (uri == null) {
      uri = Uri.parse("{}");
    }
    if (uri != null) {
      try {
        JSONObject initData = new JSONObject(uri.toString());
        String bundleUrl = initData.optString("WeexBundle", null);
        if (bundleUrl != null) {
          mUri = Uri.parse(bundleUrl);
        }

        String ws = initData.optString("Ws", null);
        if (!TextUtils.isEmpty(ws)) {
          mHotReloadManager = new HotReloadManager(ws, new HotReloadManager.ActionListener() {
            @Override
            public void reload() {
              runOnUiThread(new Runnable() {
                @Override
                public void run() {
                  Toast.makeText(WXPageActivity.this, "Hot reload", Toast.LENGTH_SHORT).show();
                  createWeexInstance();
                  renderPage();
                }
              });
            }

            @Override
            public void render(final String bundleUrl) {
              runOnUiThread(new Runnable() {
                @Override
                public void run() {
                  Toast.makeText(WXPageActivity.this, "Render: " + bundleUrl, Toast.LENGTH_SHORT).show();
                  createWeexInstance();
                  loadUrl(bundleUrl);
                }
              });
            }
          });
        } else {
          WXLogUtils.w("Weex", "can not get hot reload config");
        }
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }

    if (mUri == null) {
      mUri = Uri.parse(AppConfig.getLaunchUrl());
    }

    if (!WXSoInstallMgrSdk.isCPUSupport()) {
      mProgressBar.setVisibility(View.INVISIBLE);
      mTipView.setText(R.string.cpu_not_support_tip);
      return;
    }

    String url = getUrl(mUri);
    if (getSupportActionBar() != null) {
      getSupportActionBar().setTitle(url);
      getSupportActionBar().hide();
    }
    loadUrl(url);
  }

  private String getUrl(Uri uri) {
    String url = uri.toString();
    String scheme = uri.getScheme();
    if (uri.isHierarchical()) {
      if (TextUtils.equals(scheme, "http") || TextUtils.equals(scheme, "https")) {
        String weexTpl = uri.getQueryParameter(Constants.WEEX_TPL_KEY);
        if (!TextUtils.isEmpty(weexTpl)) {
          url = weexTpl;
        }
      }
    }
    return url;
  }

  protected void preRenderPage() {
    mProgressBar.setVisibility(View.VISIBLE);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    Intent intent = new Intent("requestPermission");
    intent.putExtra("REQUEST_PERMISSION_CODE", requestCode);
    intent.putExtra("permissions", permissions);
    intent.putExtra("grantResults", grantResults);
    LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
  }


  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.GONE);
  }

  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.VISIBLE);
    if (TextUtils.equals(errCode, WXErrorCode.WX_DEGRAD_ERR_NETWORK_CHECK_CONTENT_LENGTH_FAILED.getErrorCode())) {
      mTipView.setText(R.string.index_tip);
    } else {
      mTipView.setText("render error:" + errCode);
    }
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(mFromSplash ? R.menu.main_scan : R.menu.main, menu);
    return super.onCreateOptionsMenu(menu);
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
      case R.id.action_refresh:
        createWeexInstance();
        renderPage();
        break;
      case R.id.action_scan:
        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);
        integrator.setPrompt("Scan a barcode");
        //integrator.setCameraId(0);  // Use a specific camera of the device
        integrator.setBeepEnabled(true);
        integrator.setOrientationLocked(false);
        integrator.setBarcodeImageEnabled(true);
        integrator.setPrompt(getString(R.string.capture_qrcode_prompt));
        integrator.initiateScan();
        break;
      case android.R.id.home:
        finish();
      default:
        break;
    }

    return super.onOptionsItemSelected(item);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
    if (result != null) {
      if (result.getContents() == null) {
        Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show();
      } else {
        handleDecodeInternally(result.getContents());
      }
    }
    super.onActivityResult(requestCode, resultCode, data);
  }

  // Put up our own UI for how to handle the decoded contents.
  private void handleDecodeInternally(String code) {
		if (!TextUtils.isEmpty(code)) {
			Uri uri = Uri.parse(code);
			if (uri.getPath().contains("dynamic/replace")) {
				Intent intent = new Intent("weex.intent.action.dynamic", uri);
				intent.addCategory("weex.intent.category.dynamic");
				startActivity(intent);
				finish();
			} else if (uri.getQueryParameterNames().contains("_wx_devtool")) {
				WXEnvironment.sRemoteDebugProxyUrl = uri.getQueryParameter("_wx_devtool");
				WXEnvironment.sDebugServerConnectable = true;
				WXSDKEngine.reload();
				Toast.makeText(this, "devtool", Toast.LENGTH_SHORT).show();
				finish();
				return;
			} else {
				JSONObject data = new JSONObject();
        try {
          data.put("WeexBundle", Uri.parse(code).toString());
          Intent intent = new Intent(WXPageActivity.this, WXPageActivity.class);
          intent.setData(Uri.parse(data.toString()));
          startActivity(intent);
        } catch (JSONException e) {
          e.printStackTrace();
        }
			}
		}
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    if (mHotReloadManager != null) {
      mHotReloadManager.destroy();
    }
  }
}
