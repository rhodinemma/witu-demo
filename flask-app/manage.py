from app import create_app, db
from flask_migrate import Migrate
from flask.cli import FlaskGroup
from flask_cors import CORS

app = create_app()

CORS(app)

migrate = Migrate(app, db)
cli = FlaskGroup(app)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
    cli()
