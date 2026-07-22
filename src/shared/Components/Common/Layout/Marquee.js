
const Marquee = ({ items, themeSelect, columnGap, isBackend }) => {
    const group = (dupe = false) => (
        <div className="marquee-group" aria-hidden={dupe ? 'true' : undefined}>
            {items.map((item, index) => (
                <div className="marquee-item" style={{ marginRight: columnGap }} key={`${dupe ? 'dup-' : ''}${index}`}>
                    {themeSelect(item, index)}
                </div>
            ))}
        </div>
    );

    return (
        <div className="marquee-track">
            {group()}
            {/* A second, identical group makes the scroll seamless. Skipped in the editor. */}
            {!isBackend && group(true)}
        </div>
    );
};
export default Marquee;
