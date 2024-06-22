import SideMenu from "./side-menu";
import NotFoundRedirect from "./redirect";

export default function HomePage() {


  return (
    <>
      <NotFoundRedirect />
      <div className="flex flex-row mb-20">
        <SideMenu className="max-md:hidden" />
      </div>
    </>
  )
}
