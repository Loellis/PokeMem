import { Box } from "@mui/material";
import React, { memo } from "react";

export interface TypeIconsProps {
	types?: string[];
}

const TypeIcons: React.FC<TypeIconsProps> = ({ types }) =>
	types && types.length ? (
		<Box mt={2} display="flex" justifyContent="center">
			{types.map((type) => (
				<img
					key={type}
					src={`/images/types/${type}.png`}
					alt={type}
					height={20}
					style={{ marginRight: 2 }}
				/>
			))}
		</Box>
	) : null;

TypeIcons.displayName = "TypeIcons";

export default memo(TypeIcons);
