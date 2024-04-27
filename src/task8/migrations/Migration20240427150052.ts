import { Migration } from '@mikro-orm/migrations';

export class Migration20240427150052 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product_model" ("_id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_model_pkey" primary key ("_id"));',
    );

    this.addSql(
      'create table "user_model" ("_id" varchar(255) not null, "role" varchar(255) not null, "email" varchar(255) not null, constraint "user_model_pkey" primary key ("_id"));',
    );

    this.addSql(
      'create table "cart_model" ("_id" varchar(255) not null, "user__id" varchar(255) not null, "is_deleted" boolean not null, constraint "cart_model_pkey" primary key ("_id"));',
    );

    this.addSql(
      'create table "order_model" ("_id" varchar(255) not null, "cart__id" varchar(255) not null, "payment_type" varchar(255) not null, "payment_address" varchar(255) null, "payment_credit_card" varchar(255) null, "delivery_type" varchar(255) not null, "delivery_address" varchar(255) not null, "comments" varchar(255) null, "status" text check ("status" in (\'created\', \'completed\')) not null, "total" int not null, constraint "order_model_pkey" primary key ("_id"));',
    );
    this.addSql('alter table "order_model" add constraint "order_model_cart__id_unique" unique ("cart__id");');

    this.addSql(
      'create table "cart_item_model" ("_id" varchar(255) not null, "cart__id" varchar(255) not null, "product__id" varchar(255) not null, "count" int not null, constraint "cart_item_model_pkey" primary key ("_id"));',
    );

    this.addSql(
      'create table "user_password_model" ("_id" varchar(255) not null, "user__id" varchar(255) not null, "password" varchar(255) not null, constraint "user_password_model_pkey" primary key ("_id"));',
    );
    this.addSql('alter table "user_password_model" add constraint "user_password_model_user__id_unique" unique ("user__id");');

    this.addSql(
      'alter table "cart_model" add constraint "cart_model_user__id_foreign" foreign key ("user__id") references "user_model" ("_id") on update cascade;',
    );

    this.addSql(
      'alter table "order_model" add constraint "order_model_cart__id_foreign" foreign key ("cart__id") references "cart_model" ("_id") on update cascade;',
    );

    this.addSql(
      'alter table "cart_item_model" add constraint "cart_item_model_cart__id_foreign" foreign key ("cart__id") references "cart_model" ("_id") on update cascade;',
    );
    this.addSql(
      'alter table "cart_item_model" add constraint "cart_item_model_product__id_foreign" foreign key ("product__id") references "product_model" ("_id") on update cascade;',
    );

    this.addSql(
      'alter table "user_password_model" add constraint "user_password_model_user__id_foreign" foreign key ("user__id") references "user_model" ("_id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_password_model";');
    this.addSql('drop table if exists "cart_item_model";');
    this.addSql('drop table if exists "order_model";');
    this.addSql('drop table if exists "cart_model";');
    this.addSql('drop table if exists "user_model";');
    this.addSql('drop table if exists "product_model";');
  }
}
