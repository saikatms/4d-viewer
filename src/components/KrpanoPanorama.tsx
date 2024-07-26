import React, { useEffect } from "react";
import { krpanoJS } from "../Utils/KrpanoLib";
type Props = {
  xmlContent?: string;
};
export const KrpanoPanorama = ({ xmlContent }: Props) => {
  if (!xmlContent) {
    xmlContent = `<krpano>
                        <plugin name="WebVR" mobilevr_fake_support="true" vr_cursor="" />
                        <preview url="./tiles/preview.jpg" />
                        <image type="CUBE" multires="true" tilesize="512">
                        <level tiledimagewidth="1536" tiledimageheight="1536">
                            <cube url="./tiles/%s_%v_%h.jpg" />
                        </level>
                        </image>   
                        <view hlookat="0" vlookat="0" fov="90" />   
                        <display mipmapping="off" />
                        <contextmenu>
                        <item name="kr" caption="KRPANO" />
                        <item name="fs" caption="FULLSCREEN" />
                        <item name="cc" caption="Change Controlmode" onclick="switch(control.mousetype,moveto,drag); switch(control.touchtype,moveto,drag);" separator="true" />
                        </contextmenu>
                    </krpano>`;
  }
  console.log("embedpano111 calling");

  useEffect(() => {
    console.log("Inside UseeffectInside Useeffect");
    krpanoJS.embedpano({
      xml: "",
      target: "pano",
      html5: "auto",
      id: "krpano",
      mobilescale: 1.0,
      webglsettings: { depth: true },
      passQueryParameters: true,
      onready: function (krpano: { call: (arg0: string) => void }) {
        console.log("krpanokrpano", krpano);
        krpano.call(`loadxml(${xmlContent},null,RESET,BLEND)`);
      },
    });
  }, [xmlContent]);
  console.log("after useeffect calling");

  return (
    <div
      id="pano"
      style={{ width: "100%", height: "800px", position: "relative" }}
    ></div>
  );
};
