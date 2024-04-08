import CatDetails from "../components/CatDetails";
import { useParams } from 'react-router-dom';

const DetailView = () => {
    const { catid } = useParams();

    console.log("in detailview, catid is", catid)

    return (
        <div>
            <CatDetails catid={catid}/>
        </div>
    );
  };
  
  export default DetailView;