import { memo } from "react";

const GenreSelect = memo(({ genre, setGenre, genres }) => {
    return (
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            {genres.map((g) => (
                <option key={g.id} value={g.id}>
                    {g.name}
                </option>
            ))}
        </select>
    );
});

export default GenreSelect