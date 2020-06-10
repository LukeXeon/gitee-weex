package com.luke.gitee.extend;

import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.luke.gitee.WXPageActivity;

import org.apache.weex.annotation.JSMethod;
import org.apache.weex.common.WXModule;

public class WXEventModule extends WXModule {
    @JSMethod()
    public void openURL(String url) {
        if (TextUtils.isEmpty(url)) {
            return;
        }
        Uri uri = Uri.parse(url);
        String scheme = uri.getScheme();
        if (scheme != null) {
            if (scheme.equals("http") || scheme.equals("https") || scheme.equals("file")) {
                Intent renderIntent = new Intent(mWXSDKInstance.getContext(), WXPageActivity.class);
                renderIntent.setData(uri);
                mWXSDKInstance.getContext().startActivity(renderIntent);
            } else {
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(uri);
                mWXSDKInstance.getContext().startActivity(intent);
            }
        }
    }
}
