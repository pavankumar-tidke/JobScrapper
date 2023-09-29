# Generated by Django 4.1.9 on 2023-07-09 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0002_users_activate'),
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=200, null=True)),
                ('job_link', models.CharField(max_length=200, null=True)),
                ('job_company', models.CharField(max_length=200, null=True)),
                ('job_location', models.CharField(max_length=200, null=True)),
                ('company_icon', models.CharField(max_length=200, null=True)),
                ('listdate', models.CharField(max_length=200, null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Auth.users')),
            ],
        ),
    ]
