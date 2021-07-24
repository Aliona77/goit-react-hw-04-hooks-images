import { LoaderBox } from './Loader.styles';
import Loader from "react-loader-spinner";

export default function LoaderSpin() {
  return (
    <LoaderBox>
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80} />
      </LoaderBox>
  )
}