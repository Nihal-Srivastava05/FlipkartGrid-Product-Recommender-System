import styled from "styled-components";
import myInitObject from "../components/global";
import { useNavigate } from "react-router-dom";
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
  font-size: 28px;
  font-weight: 600;
`;
const AirMaxAxis = styled.p`
  margin: 0;
  font-size: var(--font-size-18xl);
`;

const AirMaxAxis1 = styled.p`
  margin: 0;
  font-size: 25px;
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
  right: 150px;
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
const Button = styled.button`
  background-color: green;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin-top: 15%;
  cursor: pointer;
`;

const NikeShoeWithImages = (props) => {
  console.log(props);
  console.log(myInitObject);
  //console.log(price);

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/recommendation", { state: { props } });
  };

  return (
    <NikeShoeWithImagesRoot>
      <Bg4>
        <Bg1Icon alt="" src={"/images/bg-1@2x.png"} />
      </Bg4>
      {/* <NikeShoeWithImagesChild alt="" src={"/images/rectangle-8.svg"} />
      <NikeShoeWithImagesItem alt="" src={"/images/rectangle-6.svg"} />
      <NikeShoeWithImagesInner alt="" src={"/images/rectangle-5.svg"} /> */}
      {/* <Image4Icon alt="" src={"/images/logo192.png"} /> */}
      {/* <Image7Icon alt="" src={"/images/logo192.png"} /> */}
      {/* <Image5Icon alt="" src={"/images/logo192.png"} /> */}
      {/* <RectangleIcon alt="" src={"/images/rectangle-8.svg"} /> */}
      {/* <Image6Icon alt="" src={"/images/logo192.png"} /> */}
      <NikeShoeWithImagesChild1 alt="" src={myInitObject.image} />{" "}
      {/*"/images/rectangle-9.svg"*/}
      {/* <Nike>{myInitObject.p_name}</Nike> */}
      <AirMaxAxisContainer>
        <AirMaxAxisContainer1>
          <Nike>{myInitObject.p_name}</Nike>
          <AirMaxAxis>&nbsp;</AirMaxAxis>
          <AirMaxAxis>Special price</AirMaxAxis>
          <AirMaxAxis>&nbsp;</AirMaxAxis>
          <P>{myInitObject.price}</P>
          <P>&nbsp;</P>
          <AirMaxAxis>Actual price</AirMaxAxis>
          <AirMaxAxis>{myInitObject.price}</AirMaxAxis>
          <AirMaxAxis>no offer%</AirMaxAxis>
          <AirMaxAxis>&nbsp;</AirMaxAxis>
          <AirMaxAxis>{myInitObject.description}</AirMaxAxis>
        </AirMaxAxisContainer1>
      </AirMaxAxisContainer>
      <HeartContainer>
        <HeartIcon alt="" src={"/images/heart.png"} />
      </HeartContainer>
      <AddToWishlist>
        <Button onClick={onClickHandler}>Get Recommendations</Button>
      </AddToWishlist>
    </NikeShoeWithImagesRoot>
  );
};

export default NikeShoeWithImages;
