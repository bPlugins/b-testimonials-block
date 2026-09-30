// First letter of the reviewer's name, for the avatar when there is no photo.
// The name can hold RichText markup and entities, so both are removed first.
const initialOf = (name = "") => {
	const text = String(name)
		.replace(/<[^>]*>/g, "")
		.replace(/&[#\w]+;/g, " ")
		.trim();

	return (Array.from(text)[0] || "").toUpperCase();
};

const Image = ({ attributes = {}, children, img = {}, name = "" }) => {
	const { elements = {} } = attributes || {};
	const url = img?.url || "";
	const initial = initialOf(name);

	return (
		(elements?.img ?? true) && (
			<div className="authorImg">
				<div className="img">
					{url ? (
						<img src={url} alt={img?.title || img?.alt || ""} />
					) : (
						// An empty src draws the browser's broken-image icon. An
						// SVG letter scales with whatever size the avatar is set to.
						<span className="btbAvatarFallback" aria-hidden="true">
							{initial && (
								<svg viewBox="0 0 100 100" width="100%" height="100%">
									<text
										x="50"
										y="50"
										dominantBaseline="central"
										textAnchor="middle"
										fontSize="44"
										fontWeight="700"
										fill="currentColor">
										{initial}
									</text>
								</svg>
							)}
						</span>
					)}
					{children}
				</div>
			</div>
		)
	);
};

export default Image;
