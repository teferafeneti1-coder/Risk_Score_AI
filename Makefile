VENV := /home/feneti/ai-engineering-camp/myenv
PYTHON := $(VENV)/bin/python
UVICORN := $(VENV)/bin/uvicorn

.PHONY: dev-frontend dev-backend install install-frontend install-backend

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && $(UVICORN) app.main:app --reload --port 8000

install-frontend:
	cd frontend && npm install

install-backend:
	$(VENV)/bin/pip install -r backend/requirements.txt

install: install-frontend
	@echo "Frontend deps installed. Run 'make install-backend' for Python deps."
