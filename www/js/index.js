/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onSuccess: function () {
        console.log('command executed successfully');
    },

    onError: function (err) {
        navigator.notification.alert("Error: " + err);
    },

    onSensorChanged: function (sensor, val) {
        console.log('Sensor ' + (sensor.port + 1) + ' value changed: ' + val);
    },

    onConnectedToEv3: function () {
        navigator.notification.alert("Successfully connected!");

        app.robot.sensor1.subscribeValueChanged(app.onSensorChanged, app);
        app.robot.sensor2.subscribeValueChanged(app.onSensorChanged, app);
        app.robot.sensor3.subscribeValueChanged(app.onSensorChanged, app);
        app.robot.sensor4.subscribeValueChanged(app.onSensorChanged, app);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        app.robot = new Lego.EV3();
        app.robot.connect().then(app.onConnectedToEv3, app.onError);

		app.robot.motorSpeedStep = 10;
		app.robot.motorA.speed = 0;
		app.robot.motorB.speed = 0;
		app.robot.motorC.speed = 0;

        document.getElementById('btnForward').addEventListener('click', function () {
			app.robot.motorB.speed += app.robot.motorSpeedStep;
            app.robot.motorB.setSpeed(app.robot.motorB.speed);
			app.robot.motorC.speed += app.robot.motorSpeedStep;
            app.robot.motorC.setSpeed(app.robot.motorC.speed);
        });
        document.getElementById('btnBackward').addEventListener('click', function () {
			app.robot.motorB.speed -= app.robot.motorSpeedStep;
            app.robot.motorB.setSpeed(app.robot.motorB.speed);
			app.robot.motorC.speed -= app.robot.motorSpeedStep;
            app.robot.motorC.setSpeed(app.robot.motorC.speed);
        });
        document.getElementById('btnStop').addEventListener('click', function () {
            app.robot.motorB.speed = 0;
            app.robot.motorB.stop();
            app.robot.motorC.speed = 0;
            app.robot.motorC.stop();
        });
        document.getElementById('btnLeft').addEventListener('click', function () {
			app.robot.motorB.speed -= app.robot.motorSpeedStep;
            app.robot.motorB.setSpeed(app.robot.motorB.speed);
			app.robot.motorC.speed += app.robot.motorSpeedStep;
            app.robot.motorC.setSpeed(app.robot.motorC.speed);
        });
        document.getElementById('btnRight').addEventListener('click', function () {
			app.robot.motorB.speed += app.robot.motorSpeedStep;
            app.robot.motorB.setSpeed(app.robot.motorB.speed);
			app.robot.motorC.speed -= app.robot.motorSpeedStep;
            app.robot.motorC.setSpeed(app.robot.motorC.speed);
        });
        document.getElementById('btnUp').addEventListener('click', function () {
			app.robot.motorA.speed += app.robot.motorSpeedStep;
            app.robot.motorA.setSpeed(app.robot.motorA.speed);
        });
        document.getElementById('btnDown').addEventListener('click', function () {
			app.robot.motorA.speed -= app.robot.motorSpeedStep;
            app.robot.motorA.setSpeed(app.robot.motorA.speed);
        });
        document.getElementById('btnHold').addEventListener('click', function () {
			app.robot.motorA.speed = 0;
            app.robot.motorA.stop();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
