import { Button } from "@mui/material";
import styled from "styled-components";

const Bg1Icon = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: -4.39%;
  bottom: 0%;
  left: 4.39%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
`;
const Bg4 = styled.div`
  position: absolute;
  top: 0px;
  left: -60px;
  width: 1368px;
  height: 832px;
`;
const NikeShoeWithImagesChild = styled.img`
  position: absolute;
  top: 289px;
  left: 16px;
  width: 177px;
  height: 152px;
`;
const NikeShoeWithImagesItem = styled.img`
  position: absolute;
  top: 611px;
  left: 17px;
  width: 177px;
  height: 169px;
`;
const NikeShoeWithImagesInner = styled.img`
  position: absolute;
  top: 121px;
  left: 16px;
  width: 180px;
  height: 169px;
`;
const Image4Icon = styled.img`
  position: absolute;
  top: 139px;
  left: 39px;
  width: 150px;
  height: 122px;
  object-fit: cover;
`;
const Image7Icon = styled.img`
  position: absolute;
  top: 629px;
  left: 39px;
  width: 134px;
  height: 123px;
  object-fit: cover;
`;
const Image5Icon = styled.img`
  position: absolute;
  top: 300px;
  left: 38px;
  width: 135px;
  height: 116px;
  object-fit: cover;
`;
const RectangleIcon = styled.img`
  position: absolute;
  top: 447px;
  left: 16px;
  width: 177px;
  height: 152px;
`;
const Image6Icon = styled.img`
  position: absolute;
  top: 461px;
  left: 43px;
  width: 119px;
  height: 103px;
  object-fit: cover;
`;
const HeartIcon = styled.img`
  position: absolute;
  top: 9px;
  left: 20px;
  width: 30px;
  height: 30px;
  object-fit: cover;
`;
const NikeShoeWithImagesChild1 = styled.img`
  position: absolute;
  top: 118px;
  left: 208px;
  width: 454px;
  height: 652px;
`;
const Nike = styled.div`
  position: absolute;
  top: 136px;
  left: 683px;
  font-size: 48px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 179px;
  height: 79px;
`;
const AirMaxAxis = styled.p`
  margin: 0;
`;
const P = styled.p`
  margin: 0;
  font-size: var(--font-size-18xl);
`;
const AirMaxAxisContainer1 = styled.span`
  line-break: anywhere;
  width: 100%;
`;
const AirMaxAxisContainer = styled.div`
  position: absolute;
  top: 247px;
  right: 14px;
  font-weight: 600;
  text-align: left;
  display: flex;
  align-items: center;
  width: 549px;
  height: 279px;
  font-size: var(--font-size-6xl);
`;
const HeartContainer = styled.div`
  position: absolute;
  top: 606px;
  left: 697px;
  width: 69px;
  height: 47px;
  overflow: hidden;
`;
const AddToWishlist = styled.div`
  position: absolute;
  top: 619px;
  left: 773px;
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  display: flex;
  align-items: center;
  width: 274px;
  height: 20px;
`;
const NikeShoeWithImagesRoot = styled.div`
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(219, 255, 0, 0.2),
      rgba(173, 196, 33, 0.11) 50%,
      rgba(0, 0, 0, 0)
    ),
    #d6e8d4;
  width: 100%;
  height: 832px;
  overflow: hidden;
  text-align: center;
  font-size: var(--font-size-xl);
  color: var(--color-black);
  font-family: var(--font-source-sans-pro);
`;
const NikeShoeWithImages = (props) => {
  return (
    <NikeShoeWithImagesRoot>
      <Bg4>
        <Bg1Icon alt="" src={"/images/bg-1@2x.png"} />
      </Bg4>
      <NikeShoeWithImagesChild alt="" src={"/images/rectangle-8.svg"} />
      <NikeShoeWithImagesItem alt="" src={"/images/rectangle-6.svg"} />
      <NikeShoeWithImagesInner alt="" src={"/images/rectangle-5.svg"} />
      <Image4Icon alt="" src={"/images/logo192.png"} />
      <Image7Icon alt="" src={"/images/logo192.png"} />
      <Image5Icon alt="" src={"/images/logo192.png"} />
      <RectangleIcon alt="" src={"/images/rectangle-8.svg"} />
      <Image6Icon alt="" src={"/images/logo192.png"} />

      <NikeShoeWithImagesChild1 alt="" src={"/images/rectangle-9.svg"} />
      <Nike>NIKE</Nike>
      <AirMaxAxisContainer>
        <AirMaxAxisContainer1>
          <AirMaxAxis>{props.p_name}</AirMaxAxis>
          <AirMaxAxis>Special price</AirMaxAxis>
          <AirMaxAxis>&nbsp;</AirMaxAxis>
          <P>₹5,047</P>
          <P>&nbsp;</P>
          <AirMaxAxis>₹{props.price}</AirMaxAxis>
          <AirMaxAxis>42% off</AirMaxAxis>
          <AirMaxAxis>&nbsp;</AirMaxAxis>
          <AirMaxAxis>465 ratings and 39 reviews</AirMaxAxis>
        </AirMaxAxisContainer1>
      </AirMaxAxisContainer>
      <HeartContainer>
        <HeartIcon alt="" src={"/images/heart.png"} />
      </HeartContainer>
      <AddToWishlist>Add to wishlist</AddToWishlist>
    </NikeShoeWithImagesRoot>
  );
};

export default NikeShoeWithImages;
