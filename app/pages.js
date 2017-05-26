/**
 * Created by lyan2 on 17/5/20.
 */
'use strict';

import NotificationPage from './page/notificaiton.js';
import GeolocationPage from './page/geolocation.js';

export var pages = [{id:"notification", label:"Push Notification", route:{component:NotificationPage, title:'Notification Demo'}},
    {id:"geolocation", label:"Geolocation Baidu", route:{component:GeolocationPage, title:'Geolocation Demo'}},
    {id:"button", label:"Hello World", route:""}];