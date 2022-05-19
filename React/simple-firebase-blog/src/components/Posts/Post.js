import React from "react";
import styles from "./Post.module.css";

function Post() {
	return (
		<div className={styles["post"]}>
			<h1 className={styles["post-title"]}>Blog Title</h1>
			<p className={styles["post-body"]}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
				exercitationem sed assumenda aliquid. Eaque ab sequi veritatis Lorem
				ipsum, dolor sit amet consectetur adipisicing elit. Eligendi odio id
				corporis soluta dicta doloribus pariatur tempore officiis excepturi
				praesentium amet dignissimos, sint quod, accusamus minus deleniti
				quibusdam. Dolorem odit illo explicabo quod unde obcaecati, deleniti
				ab natus consequuntur in illum id exercitationem aspernatur
				voluptatibus tenetur adipisci voluptas nisi? Omnis soluta nam
				maxime. Officiis deserunt quasi ullam, praesentium reiciendis
				debitis magnam quos nam tempora provident et itaque in nisi hic eum?
				Temporibus, reprehenderit accusantium molestiae iusto voluptatem a
				cum quis quaerat. Ut, at repellendus dolore molestiae perferendis
				nisi eaque? Perferendis ex unde doloribus, fugit asperiores quas
				dolore laborum aliquam quisquam eligendi voluptatibus delectus
				fugiat sequi. Dolore temporibus hic ab vero assumenda quae sint
				consectetur numquam ut suscipit quaerat commodi aspernatur culpa ex
				quia consequuntur nesciunt, tempora quidem minus nemo magnam
				voluptates nulla. Esse quidem, deleniti consequatur, tenetur nemo
				natus laudantium eum sint, quas quia blanditiis quo minima iusto
				amet sed fuga vitae incidunt accusantium repudiandae debitis
				suscipit nisi. Sapiente voluptatum id facere sunt commodi, beatae
				fugiat laudantium voluptatem iure repellendus dolores eveniet
				quibusdam! Ea, eveniet temporibus tempore recusandae maiores amet
				dolores obcaecati repellendus error eum ratione beatae vel nesciunt
				voluptatem quaerat earum optio ex pariatur maxime quo vitae quam
				quis.
			</p>
			<h4 className={styles["post-author"]}>@Author</h4>
			<div className={styles.react}>
				<span>
					<i class="fa-solid fa-heart"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-thumbs-up"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-face-flushed"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-face-surprise"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-face-grin-stars"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-face-grin-squint-tears"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-face-sad-cry"></i>
					<p>1</p>
				</span>
				<span>
					<i class="fa-solid fa-ghost"></i>
					<p>1</p>
				</span>
			</div>
		</div>
	);
}

export default Post;
