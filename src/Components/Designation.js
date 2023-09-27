
const Designation = ({ attributes, isBackend, RichText, deg, updateItem, __ }) => {
    const { options } = attributes;
    return options?.deg && <> {isBackend ? <RichText tagName="h5" className='deg' value={deg} onChange={(val) => updateItem("deg", val)} placeholder={__('Enter your designation', 'b-testimonials')} inlineToolbar /> : deg && <h5 className='deg' dangerouslySetInnerHTML={{ __html: deg }} />}</>

}
export default Designation