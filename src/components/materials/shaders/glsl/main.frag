 precision mediump float;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying vec3 vPos;
    varying float vBounds;
    varying vec3 vNormal;
    varying float vGreen;

    void main() {
      float zValue =  vPos.z / vBounds ;
      vec4 textColour = texture2D(uTexture, vec2(vUv.x,vUv.y ) );
 
      vec3 colour = vec3(textColour) ; 
      // vec3 colour = vec3(vNormal.z, vNormal.z + textColour.z , (vUv.x * vUv.y)) * .6; 
      gl_FragColor = vec4(vUv.x * vUv.y, colour.z * 2.4,  vNormal.z, 1.0) * 0.5;

}