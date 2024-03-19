function Post = ({name, description, likes}) =>{
    return (
        <>
        <h1>My name is (props.name)</h1>
        <h1>(props.description)</h1>
        <h1>(props.likes)</h1>

        </>
    )
}

export default Post;