
import { upload } from '../utils/icons';

const Image = ({ attributes, ToolbarButton, MediaUpload, MediaUploadCheck, isBackend, img, updateItem }) => {
    const { options } = attributes;
    return options?.img && <div className="authorImg" >
        <div className="img">
            <img src={img?.url} alt={img?.title} />
            {isBackend && <div className="upload"> <MediaUploadCheck >
                <MediaUpload allowedTypes={['image']} value={img} onSelect={({ id, url, alt, title }) => updateItem('img', { id, url, alt, title })} render={({ open }) => <ToolbarButton label="upload" icon={upload} onClick={open} />} />
            </MediaUploadCheck> </div>}
        </div>
    </div>
}
export default Image;