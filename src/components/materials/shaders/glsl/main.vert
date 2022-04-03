 precision mediump float;
    uniform float uBounds;
    uniform float uGreen;

    varying vec2 vUv;
    varying vec3 vPos;
    varying float vBounds;
    varying vec3 vNormal;
    varying float vGreen;

    void main() {
       vUv = uv;
       vBounds = uBounds;
       vGreen = uGreen;
       vNormal = normal;

       vPos = position;

       vec4 modelPosition = modelMatrix * vec4(vec3(position.x , position.y, position.z), 1.0);

       vec4 viewPosition = viewMatrix * modelPosition;
       vec4 projectedPosition = projectionMatrix * viewPosition;
       gl_Position = projectedPosition;

}