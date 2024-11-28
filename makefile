# Makefile for Quarto Project Rendering and Management

# Phony targets to ensure they always run, even if a file with the same name exists
.PHONY: render render_main

render:
	@echo "Render all documents"
	quarto render
	
render_main:
	@echo "Preparing for a major version change..."
	quarto render index.qmd
	quarto render about\index.qmd
	quarto render curriculum\index.qmd
	quarto render curriculum\resume\index.qmd
	quarto render blog.qmd
	quarto render 学汉语的日记.qmd
	quarto render jiu_jitsu_journal\index.qmd
	quarto render 404.qmd
	@echo "Major change process completed."

# Help target to show available commands
help:
	@echo "Available commands:"
	@echo "  make major_change  - Prepare and render for a major version change"
	@echo "  make help      - Show this help message"