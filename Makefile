# AI ROI for Enterprises - Development Makefile

.PHONY: help install dev build start test lint clean db-setup db-seed db-reset

# Default target
help:
	@echo "AI ROI for Enterprises - Available Commands:"
	@echo ""
	@echo "Setup:"
	@echo "  install     Install dependencies"
	@echo "  dev         Start development server"
	@echo "  build       Build for production"
	@echo "  start       Start production server"
	@echo ""
	@echo "Database:"
	@echo "  db-setup    Initialize database schema"
	@echo "  db-seed      Seed database with example data"
	@echo "  db-reset     Reset database (WARNING: destroys data)"
	@echo "  db-studio    Open Prisma Studio"
	@echo ""
	@echo "Testing:"
	@echo "  test        Run unit tests"
	@echo "  test:e2e    Run end-to-end tests"
	@echo "  lint        Run linting"
	@echo "  type-check  Run TypeScript type checking"
	@echo ""
	@echo "Utilities:"
	@echo "  clean       Clean build artifacts"
	@echo "  format      Format code with Prettier"
	@echo ""

# Setup commands
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

dev:
	@echo "🚀 Starting development server..."
	npm run dev

build:
	@echo "🏗️ Building for production..."
	npm run build
	@echo "✅ Build complete"

start:
	@echo "🚀 Starting production server..."
	npm run start

# Database commands
db-setup:
	@echo "🗄️ Setting up database..."
	npm run db:push
	@echo "✅ Database schema created"

db-seed:
	@echo "🌱 Seeding database with example data..."
	npm run db:seed
	@echo "✅ Database seeded"

db-reset:
	@echo "⚠️  Resetting database (this will destroy all data)..."
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	rm -f prisma/dev.db
	npm run db:push
	npm run db:seed
	@echo "✅ Database reset complete"

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	npm run db:studio

# Testing commands
test:
	@echo "🧪 Running unit tests..."
	npm run test

test:e2e:
	@echo "🧪 Running end-to-end tests..."
	npm run test:e2e

lint:
	@echo "🔍 Running linter..."
	npm run lint

type-check:
	@echo "🔍 Running type checking..."
	npm run type-check

# Utility commands
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf dist
	@echo "✅ Clean complete"

format:
	@echo "🎨 Formatting code..."
	npx prettier --write .
	@echo "✅ Code formatted"

# Full setup (install + db + seed)
setup: install db-setup db-seed
	@echo ""
	@echo "🎉 Setup complete! You can now run 'make dev' to start the development server."
	@echo "📊 Example initiative available at: http://localhost:3000/initiative/example"
	@echo "🆕 Create new assessment at: http://localhost:3000/initiative/new"

# Development workflow
dev-full: clean install db-setup db-seed dev

# Production deployment check
deploy-check: type-check lint test
	@echo "✅ All checks passed - ready for deployment"

# Quick development start
quick: install dev
