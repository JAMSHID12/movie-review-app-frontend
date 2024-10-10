import { memo } from "react";


const LanguageSelect = memo(({ language, setLanguage, languages }) => {
    return (
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">All Languages</option>
            {languages.map((l) => (
                <option key={l.id} value={l.id}>
                    {l.name}
                </option>
            ))}
        </select>
    );
});

export default LanguageSelect;