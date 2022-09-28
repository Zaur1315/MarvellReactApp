import ErrorMessage from "../errorMessage/ErrorMessage"
import {Link} from 'react-router-dom'

const Page404 = () =>{
    return(
        <div className="">
            <ErrorMessage/>
            <p style={{'textAlign' : 'center', 'fontWeigth' : 'bold', 'fontSize': '24px'}}>Page doeson't exist</p>
            <Link style={{'display' : 'block', 'textAlign' : 'center', 'fontWeight' : 'bold' , 'fontSize' : '24px', 'marginTop' : '30px'}} to='/'>Back to main page</Link>
        </div>
    )
}


export default Page404;