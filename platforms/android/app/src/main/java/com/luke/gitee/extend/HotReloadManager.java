package com.luke.gitee.extend;

import android.text.TextUtils;

import org.apache.weex.utils.WXLogUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;


public class HotReloadManager {
    private static final String TAG = "HotReloadManager";
    private ActionListener listener;
    private WebSocket session;

    public HotReloadManager(String ws, final ActionListener actionListener) {
        if (TextUtils.isEmpty(ws) || actionListener == null) {
            WXLogUtils.w("HotReloadManager", "Illegal arguments");
            return;
        }
        this.listener = actionListener;

        OkHttpClient client = new OkHttpClient();
        Request.Builder builder = new Request.Builder();
        builder.url(ws);
        Request request = builder.build();

        session = client.newWebSocket(request, new WebSocketListener() {

            @Override
            public void onOpen(@NotNull WebSocket webSocket, @NotNull Response response) {
                WXLogUtils.w(TAG, "ws session open");
            }

            @Override
            public void onMessage(@NotNull WebSocket webSocket, @NotNull String text) {
                WXLogUtils.w(TAG, "on message");
                try {
                    JSONObject rpcMessage = new JSONObject(text);
                    String method = rpcMessage.optString("method", null);
                    if (!TextUtils.isEmpty(method)) {
                        if ("WXReload".equals(method)) {
                            listener.reload();
                        } else if ("WXReloadBundle".equals(method)) {
                            String bundleUrl = rpcMessage.optString("params", null);
                            if (!TextUtils.isEmpty(bundleUrl)) {
                                listener.render(bundleUrl);
                            }
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
                WXLogUtils.w("HotReloadManager", "Closed:" + code + ", " + reason);
            }

            @Override
            public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
                t.printStackTrace();
            }

        });
    }

    public void destroy() {
        if (session != null) {
            session.close(1001, "GOING_AWAY");
        }
    }

    public interface ActionListener {
        void reload();

        void render(String bundleUrl);
    }
}
