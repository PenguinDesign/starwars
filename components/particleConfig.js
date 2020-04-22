const config = {
    "detectRetina": false,
    "fpsLimit": 30,
    "interactivity": {
        "detectsOn": "canvas",
        "events": {
            "onClick": {
                "enable": true,
                "mode": "repulse"
            },

            "resize": true
        },
        "modes": {
            "connect": {
                "distance": 80,
                "lineLinked": {
                    "opacity": 0.5
                },
                "radius": 60
            },
            "push": {
                "quantity": 4
            },
            "remove": {
                "quantity": 2
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            }
        }
    },
    "particles": {
        "color": {
            "value": "#ffffff"
        },
        "lineLinked": {
            "blink": false,
            "color": {
                "value": "#ffffff"
            },
            "consent": false,
            "distance": 150,
            "enable": false,
            "opacity": 0.4,
            "shadow": {
                "blur": 5,
                "color": {
                    "value": "lime"
                },
                "enable": false
            },
            "width": 1
        },
        "move": {
            "attract": {
                "enable": false,
                "rotate": {
                    "x": 600,
                    "y": 600
                }
            },
            "collisions": false,
            "direction": "none",
            "enable": true,
            "outMode": "out",
            "random": true,
            "speed": 1,
            "straight": false,
            "trail": {
                "enable": false,
                "length": 10,
                "fillColor": {
                    "value": "#000000"
                }
            }
        },
        "number": {
            "density": {
                "enable": true,
                "area": 800
            },
            "limit": 0,
            "value": 160
        },
        "opacity": {
            "animation": {
                "enable": true,
                "minimumValue": 0,
                "speed": 1,
                "sync": false
            },
            "random": {
                "enable": true,
                "minimumValue": 1
            },
            "value": 1
        },
        "rotate": {
            "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
            },
            "direction": "clockwise",
            "random": false,
            "value": 0
        },
        "shape": {
            "character": {
                "fill": true,
                "font": "Verdana",
                "style": "",
                "value": "*",
                "weight": "400",
                "close": true
            },
            "image": {
                "height": 100,
                "replaceColor": true,
                "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                "width": 100,
                "fill": true,
                "close": true
            },
            "polygon": {
                "close": true,
                "fill": true,
                "sides": 5
            },
            "type": "circle",
            "custom": {}
        },
        "size": {
            "animation": {
                "enable": false,
                "minimumValue": 0.3,
                "speed": 4,
                "sync": false
            },
            "random": {
                "enable": true,
                "minimumValue": 1
            },
            "value": 3
        },
        "shadow": {
            "blur": 0,
            "color": {
                "value": "#000000"
            },
            "enable": false,
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        "stroke": {
            "color": {
                "value": "#000000"
            },
            "width": 0,
            "opacity": 1
        }
    },
    "pauseOnBlur": true
}
export default config;