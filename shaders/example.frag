// Copyright 2013 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

layout(location = 0) uniform float iTime;
layout(location = 1) uniform vec2 iResolution;
layout(location = 2) uniform sampler2D image;

layout(location = 0) out vec4 fragColor;

void main()
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / iResolution;
  float t = 4 * iTime;

  // Time varying pixel color
  vec3 col = 0.5 + 0.5 * cos(t + uv.xyx + vec3(0, 1, 4));

  // Multiply the color with the sampled image.
  vec4 image_col = texture(image, uv);
  col = mix(col, col * image_col.rgb, image_col.a);

  // Output to screen
  fragColor = vec4(col, 1.0);
}
