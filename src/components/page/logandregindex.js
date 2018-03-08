/* eslint-disable */
module.exports = function() {
        var canvasEl = document.getElementById('stage');
        var ctx = canvasEl.getContext('2d');
        var mousePos = [0, 0];
        var nodes = [];
        var edges = [];
        var easingFactor = 10.0; //缓动因子
        var backgroundColor = '#77b1ff'; //背景颜色
        // var nodeColor = 'rgba(255, 255, 255, .4)'; //点颜色
        var color = 'rgb(164, 203, 255)';
        var nodeColor = color; //'rgba(64, 145, 255, 0.72)';
        var edgeColor = color; //'rgba(255, 255, 255, .3)'; //边颜色
        var pageWidth = window.innerWidth, //窗口宽度
            pageHeight = window.innerHeight; //窗口高度
        window.onresize = function() {
            canvasEl.width = pageWidth;
            canvasEl.height = pageHeight;

            if (nodes.length == 0) {
                constructNodes();
            }

            render();
        };

        window.onresize();


        function constructNodes() {
            for (var i = 0; i < 60; i++) {
                var node = {
                    drivenByMouse: i == 0,
                    x: Math.random() * canvasEl.width,
                    y: Math.random() * canvasEl.height,
                    vx: Math.random() * 1 - 0.3,
                    vy: Math.random() * 1 - 0.3,
                    radius: Math.random() > 0.9 ? 1 + Math.random() * 3 : .4 + Math.random() * 3
                };

                nodes.push(node);
            }

            nodes.forEach(function(e) {
                nodes.forEach(function(e2) {
                    if (e == e2) {
                        return;
                    }

                    var edge = {
                        from: e,
                        to: e2
                    }

                    addEdge(edge);
                });
            });
        }

        function addEdge(edge) {
            var ignore = false;

            edges.forEach(function(e) {
                if (e.from == edge.from & e.to == edge.to) {
                    ignore = true;
                }

                if (e.to == edge.from & e.from == edge.to) {
                    ignore = true;
                }
            });

            if (!ignore) {
                edges.push(edge);
            }
        }

        function step() {
            nodes.forEach(function(e) {
                if (e.drivenByMouse) {
                    return;
                }

                e.x += e.vx;
                e.y += e.vy;

                function clamp(min, max, value) {
                    if (value > max) {
                        return max;
                    } else if (value < min) {
                        return min;
                    } else {
                        return value;
                    }
                }

                if (e.x <= 0 || e.x >= canvasEl.width) {
                    e.vx *= -1;
                    e.x = clamp(0, canvasEl.width, e.x)
                }

                if (e.y <= 0 || e.y >= canvasEl.height) {
                    e.vy *= -1;
                    e.y = clamp(0, canvasEl.height, e.y)
                }
            });

            adjustNodeDrivenByMouse();
            render();
            window.requestAnimationFrame(step);
        }

        function adjustNodeDrivenByMouse() {
            nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor;
            nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor;
        }

        function render() {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

            edges.forEach(function(e) {
                var l = lengthOfEdge(e);
                var threshold = canvasEl.width / 8;

                if (l > threshold) {
                    return;
                }

                ctx.strokeStyle = edgeColor;
                ctx.lineWidth = (1.0 - l / threshold) * 2.5;
                ctx.globalAlpha = 1.0 - l / threshold;
                ctx.beginPath();
                ctx.moveTo(e.from.x, e.from.y);
                ctx.lineTo(e.to.x, e.to.y);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;

            nodes.forEach(function(e) {
                if (e.drivenByMouse) {
                    return;
                }

                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }

        function lengthOfEdge(edge) {
            return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));
        }

        window.onmousemove = function(e) {
            mousePos[0] = e.clientX;
            mousePos[1] = e.clientY;
        }

        window.requestAnimationFrame(step);

    }
    /* eslint-disable no-new */