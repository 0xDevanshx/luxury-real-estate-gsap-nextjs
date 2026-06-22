import CustomCursor from "./CustomCursor";
import ProgressBar from "./ProgressBar";
import BackToTop from "./BackToTop";

export default function GlobalInteractiveLayer() {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <BackToTop />
    </>
  );
}
