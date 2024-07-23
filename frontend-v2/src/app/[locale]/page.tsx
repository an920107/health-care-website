import IndexMenu from "./index-menu";
import NotFoundRedirect from "./redirect";
import Carousel from "./carousel";
import Restaurant from "./restaurant";
import PostPanel from "./post/post-panel";

type Props = {
  params: { locale: string };
};

export default function HomePage({ params }: Props) {
  return (
    <>
      <NotFoundRedirect />
      <div className="flex flex-row gap-10">
        <IndexMenu className="max-md:hidden" />
        <div className="flex flex-col flex-1 gap-10">
          <Carousel className="rounded-xl shadow-lg mb-4" images={
            [
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
              "https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg",
              "https://media.wired.com/photos/59324c6352d99d6b984dd8ee/master/w_2560%2Cc_limit/Grumpy_Kitty....jpg",
              "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
            ]
          } />
          <PostPanel locale={params.locale} isEnableTitle={true} isEnableMore={true} />
          <Restaurant />
        </div>
      </div>
    </>
  )
}
