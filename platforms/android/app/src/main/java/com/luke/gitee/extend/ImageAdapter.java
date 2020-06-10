/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.luke.gitee.extend;

import android.graphics.drawable.Drawable;
import android.os.Looper;
import android.text.TextUtils;
import android.widget.ImageView;

import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;

import org.apache.weex.WXSDKInstance;
import org.apache.weex.WXSDKManager;
import org.apache.weex.adapter.IWXImgLoaderAdapter;
import org.apache.weex.common.WXImageStrategy;
import org.apache.weex.dom.WXImageQuality;

public class ImageAdapter implements IWXImgLoaderAdapter {

    public ImageAdapter() {
    }

    @Override
    public void setImage(final String url,
                         final ImageView view,
                         final WXImageQuality quality,
                         final WXImageStrategy strategy) {

        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                if (view == null || view.getLayoutParams() == null) {
                    return;
                }
                if (TextUtils.isEmpty(url)) {
                    view.setImageBitmap(null);
                    return;
                }
                if (null != strategy) {
                    recordImgLoadAction(strategy.instanceId);
                }
                Glide.with(view)
                        .load(url)
                        .transform(new FastBlur(strategy == null ? 0 : strategy.blurRadius))
                        .addListener(new RequestListener<Drawable>() {
                            @Override
                            public boolean onLoadFailed(
                                    @Nullable GlideException e,
                                    Object model,
                                    Target<Drawable> target,
                                    boolean isFirstResource
                            ) {
                                if (strategy == null) {
                                    return false;
                                }
                                Runnable run = new Runnable() {
                                    @Override
                                    public void run() {
                                        if (strategy.getImageListener() != null) {
                                            strategy.getImageListener().onImageFinish(url, view, false, null);
                                        }
                                        recordImgLoadResult(strategy.instanceId, false);
                                    }
                                };
                                WXSDKManager.getInstance().postOnUiThread(run, 0);
                                return false;
                            }

                            @Override
                            public boolean onResourceReady(
                                    Drawable resource,
                                    Object model,
                                    Target<Drawable> target,
                                    DataSource dataSource,
                                    boolean isFirstResource
                            ) {
                                if (strategy == null) {
                                    return false;
                                }
                                Runnable run = new Runnable() {
                                    @Override
                                    public void run() {
                                        if (strategy.getImageListener() != null) {
                                            strategy.getImageListener().onImageFinish(url, view, true, null);
                                        }
                                        recordImgLoadResult(strategy.instanceId, true);
                                    }
                                };
                                WXSDKManager.getInstance().postOnUiThread(run, 0);
                                return false;
                            }
                        })
                        .into(view);
            }
        };
        if (Thread.currentThread() == Looper.getMainLooper().getThread()) {
            runnable.run();
        } else {
            WXSDKManager.getInstance().postOnUiThread(runnable, 0);
        }
    }

    private void recordImgLoadAction(String instanceId) {
        WXSDKInstance instance = WXSDKManager.getInstance().getAllInstanceMap().get(instanceId);
        if (null == instance || instance.isDestroy()) {
            return;
        }
        instance.getApmForInstance().actionLoadImg();
    }

    private void recordImgLoadResult(String instanceId, boolean succeed) {
        WXSDKInstance instance = WXSDKManager.getInstance().getAllInstanceMap().get(instanceId);
        if (null == instance || instance.isDestroy()) {
            return;
        }
        instance.getApmForInstance().actionLoadImgResult(succeed, null);
    }
}
