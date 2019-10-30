(function() {

    glUtils.SL.init({ callback: function() { main(); } });
    var canvas = document.getElementById("glcanvas"),
        vertexShader, fragmentShader, program;

    function main() {
        gl = glUtils.checkWebGL(canvas);

        vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment),
            program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        draw();
    }

    function seconddraw() {
        var vertices = [];
        var cubePoints = [-0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //1
            -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //2
            -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //1
            0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //4
            -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //1
            -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, //5
            -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //2
            0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //3
            -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //2
            -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //6
            0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //3
            0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //4
            0.5, 0.5, 0.5, 1.0, 1.0, 1.0, //3
            0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //7
            0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //4
            0.5, -0.5, -0.5, 1.0, 1.0, 1.0, //8
            -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, //5
            -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //6
            -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, //5
            0.5, -0.5, -0.5, 1.0, 1.0, 1.0, //8
            -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //6
            0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //7
            0.5, 0.5, -0.5, 1.0, 1.0, 1.0, //7
            0.5, -0.5, -0.5, 1.0, 1.0, 1.0 //8
        ];
    }

    function draw() {
        var vertices = [-0.4, -0.9, 1, 1, 1, -0.4, +0.7, 1, 1, 1, +0.25, +0.7, 1, 1, 1, +0.1, +0.3, 1, 1, 1, -0.2, +0.3, 1, 1, 1, -0.2, +0.0, 1, 1, 1, -0.2, +0.0, 1, 1, 1, -0.0, +0.0, 1, 1, 1, -0.099999999, -0.3, 1, 1, 1, -0.2, -0.3, 1, 1, 1, -0.2, -0.9, 1, 1, 1, +0.3, -0.9, 1, 1, 1, +0.5, -0.9, 1, 1, 1, +0.5, -0.3, 1, 1, 1,

            +0.8, -0.3, 1, 1, 1, +0.8, +0.0, 1, 1, 1, +0.5, +0.0, 1, 1, 1,

            +0.5, +0.3, 1, 1, 1, +1.0, +0.3, 1, 1, 1, +1.0, +0.7, 1, 1, 1,

            +0.3, -0.3, 1, 1, 1, +0.5, -0.3, 1, 1, 1, +0.3, -0.9, 1, 1, 1,


            +0.5, +0.0, 1, 1, 1, +0.5, -0.3, 1, 1, 1, +0.8, -0.3, 1, 1, 1,

            +0.5, +0.7, 1, 1, 1, +1.0, +0.7, 1, 1, 1, +0.5, +0.3, 1, 1, 1,

            +0.5, +0.7, 1, 1, 1, +0.3, -0.3, 1, 1, 1, +0.5, -0.3, 1, 1, 1,

            +0.3, +0.7, 1, 1, 1, +0.3, -0.3, 1, 1, 1, +0.5, +0.7, 1, 1, 1
        ];
        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Membuat sambungan untuk attribute
        var vPosition = gl.getAttribLocation(program, 'vPosition');
        var vColor = gl.getAttribLocation(program, 'vColor');
        gl.vertexAttribPointer(
            vPosition, // variabel yang memegang posisi attribute di shader
            2, // jumlah elemen per atribut
            gl.FLOAT, // tipe data atribut
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
            0 // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
        var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
        var theta = 0;
        var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
        var scaleX = 1.0;
        var scaleYUniformLocation = gl.getUniformLocation(program, 'scaleY');

        var translationLoc = gl.getUniformLocation(program, 'translasi');
        var melebar = 1.0;

        function render() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            if (scaleX >= 1.0) melebar = -1.0;
            else if (scaleX <= -1.0) melebar = 1.0;
            scaleX += 0.0078 * melebar;
            theta += Math.PI * 0.0078;

            gl.uniform1f(translationLoc, 0.0);
            gl.uniform1f(thetaUniformLocation, 0.0);
            gl.uniform1f(scaleXUniformLocation, scaleX);
            gl.uniform1f(scaleYUniformLocation, 1.0);

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 11, 24);

            gl.uniform1f(thetaUniformLocation, theta);
            gl.uniform1f(scaleXUniformLocation, 1.0);
            gl.uniform1f(scaleYUniformLocation, 1.0);
            gl.uniform1f(translationLoc, 0.5);
            gl.drawArrays(gl.LINE_LOOP, 0, 11);
            requestAnimationFrame(render);
        }
        render();
    }
})();