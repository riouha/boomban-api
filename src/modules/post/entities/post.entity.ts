import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Category } from '../../category/entities/category.entity';

@Entity()
@Unique('UNQ_src_link', ['source', 'link'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  type: 'Post' | 'Article' | 'News' | 'RssPost' | 'RssNews';

  @Column({ default: 'Draft' })
  status: 'Draft' | 'Published';

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  //#region seo
  @Column({ nullable: true })
  thumbnailAlt?: string;
  @Column({ nullable: true })
  seoTitle?: string;
  @Column({ nullable: true })
  seoText?: string;
  @Column({ type: 'simple-array', nullable: true })
  keywords?: string[];
  //#endregion

  @ManyToMany(() => Category)
  @JoinTable({ name: 'post_categories' })
  categories: Category[];

  @Column({ nullable: true })
  source?: string;
  @Column({ nullable: true })
  link?: string;

  //-------------
  @Column({ nullable: true })
  publishDate?: Date;

  //########################################
  @Column({ nullable: true })
  userId?: number;
  @Transform(({ value }) => Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(value))
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
