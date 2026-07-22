const ExpandButton = ({ attributes, expanded, onChange }) => {
  const { elements } = attributes;
  const { expandBtn, expandText, collapseText } = elements;

  return expandBtn && <span className='expandBtn' type="button" onClick={onChange}>
    {expanded ? collapseText : expandText}
  </span>
}

export default ExpandButton;