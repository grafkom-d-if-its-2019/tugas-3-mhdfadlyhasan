(function() {

    glUtils.SL.init({ callback: function() { main(); } });
    var canvas = document.getElementById("glcanvas"),
        vertexShader, fragmentShader, program;

    function main() {

        gl = glUtils.checkWebGL(canvas);
        // Inisialisasi shaders dan program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);


        var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);
        var thetaLoc = gl.getUniformLocation(program, 'theta');
        var transLoc = gl.getUniformLocation(program, 'vec');
        var sizeLoc = gl.getUniformLocation(program, 'size');
        var mmLoc = gl.getUniformLocation(programCube, 'modelMatrix');
        var mm = glMatrix.mat4.create();
        var size = 0.2;
        var thetaT = [30, 60, 0];
        var vec = [0, 0, 0];
        var vecX = 0.0078;
        var vecY = 0.0087;
        var vecZ = 0.00788;
        var nrp = 0.78;
        var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
        var thetaCube = [-30, 60, 0];
        var theta = 0;
        var thetaSpeed = 0.0;
        var vertexBufferObject = gl.createBuffer();
        gl.useProgram(program);


        function cube() {
            gl.useProgram(programCube);

            var cubeVertices = [

                -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, //1
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

            var cubeVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(programCube, 'vPosition');
            var vColor = gl.getAttribLocation(programCube, 'vColor');
            gl.vertexAttribPointer(
                vPosition, // variabel yang memegang posisi attribute di shader
                3, // jumlah elemen per attribute
                gl.FLOAT, // tipe data atribut
                gl.FALSE,
                6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
                6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

            gl.uniform3fv(thetaLocCube, thetaCube);
        }


        function triangle() {
            gl.useProgram(program);

            // Definisi vertex and buffer
            var triangleVertices = [

                -0.4, -0.9, 1, 1, 1, -0.4, +0.7, 1, 1, 1, +0.25, +0.7, 1, 1, 1, +0.1, +0.3, 1, 1, 1, -0.2, +0.3, 1, 1, 1, -0.2, +0.0, 1, 1, 1, -0.2, +0.0, 1, 1, 1, -0.0, +0.0, 1, 1, 1, -0.099999999, -0.3, 1, 1, 1, -0.2, -0.3, 1, 1, 1, -0.2, -0.9, 1, 1, 1, +0.3, -0.9, 1, 1, 1, +0.5, -0.9, 1, 1, 1, +0.5, -0.3, 1, 1, 1,

                +0.8, -0.3, 1, 1, 1, +0.8, +0.0, 1, 1, 1, +0.5, +0.0, 1, 1, 1,

                +0.5, +0.3, 1, 1, 1, +1.0, +0.3, 1, 1, 1, +1.0, +0.7, 1, 1, 1,

                +0.3, -0.3, 1, 1, 1, +0.5, -0.3, 1, 1, 1, +0.3, -0.9, 1, 1, 1,


                +0.5, +0.0, 1, 1, 1, +0.5, -0.3, 1, 1, 1, +0.8, -0.3, 1, 1, 1,

                +0.5, +0.7, 1, 1, 1, +1.0, +0.7, 1, 1, 1, +0.5, +0.3, 1, 1, 1,

                +0.5, +0.7, 1, 1, 1, +0.3, -0.3, 1, 1, 1, +0.5, -0.3, 1, 1, 1,

                +0.3, +0.7, 1, 1, 1, +0.3, -0.3, 1, 1, 1, +0.5, +0.7, 1, 1, 1


            ];

            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            var vColor = gl.getAttribLocation(program, 'vColor');

            gl.vertexAttribPointer(
                vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
            );
            gl.vertexAttribPointer(
                vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
            );

            gl.uniform1f(sizeLoc, size);

            //Hit the Wall

            if (vec[0] > 0.5 * (1 - size) || vec[0] < -0.5 * (1 - size)) {
                vecX = vecX * -1;
            }
            vec[0] += vecX;

            if (vec[1] > 0.5 * (1 - size) || vec[1] < -0.5 * (1 - size)) {
                vecY = vecY * -1;
            }
            vec[1] += vecY;

            if (vec[2] > 0.5 * (1 - size) || vec[2] < -0.5 * (1 - size)) {
                vecZ = vecZ * -1;
            }
            vec[2] += vecZ;

            gl.uniform3fv(transLoc, vec);

            // gl.enableVertexAttribArray(vPosition);
            // gl.enableVertexAttribArray(vColor);

            //Y Rotation

            thetaT[1] += (nrp * 3);

            gl.uniform3fv(thetaLoc, thetaT);
        }



        function render() {
            // Bersihkan layar jadi hitam
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            // Bersihkan buffernya canvas
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            triangle();
            gl.drawArrays(gl.TRIANGLES, 11, 24);
            theta += thetaSpeed;
            gl.uniformMatrix4fv(mmLoc, false, mm);

            cube();
            gl.drawArrays(gl.LINES, 0, 24);

            requestAnimationFrame(render);
        }

        render();
    }
})();