/**
 * Created by lyan2 on 17/5/20.
 */
'use strict';

import NotificationPage from './page/notificaiton.js';
import GeolocationPage from './page/geolocation.js';
import WebViewPage from './page/webview.js';
import CameralRollPage from './page/cameralroll.js';

export var pages = [{id:"notification", label:"Push Notification", route:{component:NotificationPage, title:'Notification Demo'}},
    {id:"geolocation", label:"Geolocation Baidu", route:{component:GeolocationPage, title:'Geolocation Demo'}},
    {id:"webview", label:"WebView", route:{component:WebViewPage, title:'WebView Demo'}},
    {id:"cameralroll", label:"CameralRoll", route:{component:CameralRollPage, title:'Cameral Roll'}}];