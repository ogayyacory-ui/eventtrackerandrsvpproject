"""add unique RSVP constraint

Revision ID: c92b8baf4d02
Revises: 2846c178119b
"""
from alembic import op

revision = 'c92b8baf4d02'
down_revision = '2846c178119b'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('rsvps') as batch_op:
        batch_op.create_unique_constraint('uq_rsvp_user_event', ['user_id', 'event_id'])


def downgrade():
    with op.batch_alter_table('rsvps') as batch_op:
        batch_op.drop_constraint('uq_rsvp_user_event', type_='unique')
