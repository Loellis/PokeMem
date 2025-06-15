import { memo } from "react";

interface Props {
	src: string;
	alt: string;
	size?: number;
}

const SilhouetteImg = ({ src, alt, size = 150 }: Props) => (
	<img src={src} alt={alt} style={{ maxWidth: size }} />
);

// 👇 add this line before the memo() call
SilhouetteImg.displayName = "SilhouetteImg";

export default memo(SilhouetteImg);
