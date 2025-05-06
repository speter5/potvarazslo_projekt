
import { Files,YoutubeLogo  } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

function Post({post}) {
    return <div className={`rounded-xl flex flex-row w-3/4 bg-gray-800 overflow-hidden ${!post?.jovahagyva && "opacity-50"}`}>
    <div className="flex items-center m-5">
      
      {post?.video?<YoutubeLogo size={64} weight="fill" className="text-white" />:<Files size={64} weight="fill" className="text-white" />}
    </div>
    <div className=" m-5 ml-0 flex flex-col gap-2">
      <Link href={"/bejegyzesek/"+post?.slug} className="hover:underline transition text-xl font-bold text-gray-200">
      {post?.cim}
      </Link>

      <p className="mt-2  text-white/75 line-clamp-3">{post?.autoTipus}</p>
      

      {/* Dátum és szerző */}
      <div className="text-sm text-gray-300/75 mt-1">  { new Date(post?.datum)?.toLocaleDateString()}</div>
    
    </div>
  </div>
    
}
export default Post