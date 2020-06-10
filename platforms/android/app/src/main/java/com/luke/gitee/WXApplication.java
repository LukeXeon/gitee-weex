package com.luke.gitee;

import android.app.Application;

import com.luke.gitee.extend.ImageAdapter;
import com.luke.gitee.extend.JSExceptionAdapter;
import com.luke.gitee.extend.WXEventModule;
import com.luke.gitee.util.AppConfig;

import org.apache.weex.InitConfig;
import org.apache.weex.WXSDKEngine;
import org.apache.weex.common.WXException;

public class WXApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    WXSDKEngine.addCustomOptions("appName", "WXSample");
    WXSDKEngine.addCustomOptions("appGroup", "WXApp");
    WXSDKEngine.initialize(this,
        new InitConfig.Builder()
                .setImgAdapter(new ImageAdapter())
                .setJSExceptionAdapter(new JSExceptionAdapter())
                .build()
    );
    try {
      WXSDKEngine.registerModule("event", WXEventModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
    AppConfig.init(this);
  }
}
