# tools/

## pdf_to_lesson.py

Converts a source curriculum document into a lesson spec. See the main
README's "Generating a lesson from source material" section for full usage.

Quick reference:

```bash
pip install pdfplumber python-docx requests
export ANTHROPIC_API_KEY=your-key-here
python3 pdf_to_lesson.py <source.pdf|source.docx> --subject "..." --course "..." --out filename.js
```

Output lands in `src/content/generated/filename.js`, always as a draft to
review, never auto-wired into the live catalog. That step stays manual on
purpose.
