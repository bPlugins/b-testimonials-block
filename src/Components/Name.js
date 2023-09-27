
const Name = ({ attributes, isBackend, RichText, updateItem, __, name }) => {
    const { options } = attributes;
    return options?.name && <>{isBackend ? <RichText tagName="h3" className='name' value={name} onChange={(val) => updateItem("name", val)} placeholder={__('Enter your name', 'b-testimonials')} inlineToolbar /> : name && <h2 className='name' dangerouslySetInnerHTML={{ __html: name }} />} </>

}
export default Name;