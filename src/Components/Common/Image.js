
const Image = ({ attributes, children, img }) => {
    const { elements } = attributes;

    return elements?.img && <div className="authorImg">
        <div className="img">
            <img src={img?.url} alt={img?.title} />
            {children}
        </div>
    </div>
}
export default Image;