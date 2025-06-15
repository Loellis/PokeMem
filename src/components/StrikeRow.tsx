import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

export interface StrikeRowProps {
	count: number;
}

const StrikeRow: React.FC<StrikeRowProps> = ({ count }) => (
	<Box mt={1} display="flex" justifyContent="center">
		{Array.from({ length: count }).map((_, i) => (
			<Typography
				key={i}
				component="span"
				role="img"
				aria-label="strike"
				sx={{ fontSize: "1.5rem", mx: 0.3 }}
			>
				❌
			</Typography>
		))}
	</Box>
);

StrikeRow.displayName = "StrikeRow";

export default memo(StrikeRow);
