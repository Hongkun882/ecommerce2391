# Generated by Django 5.0.3 on 2024-05-20 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_alter_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="rating",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
