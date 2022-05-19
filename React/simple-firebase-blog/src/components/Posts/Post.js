import React from "react";
import styles from "./Post.module.css";
import PostContainer from "../Containers/PostContainer";
import PostBlock from "../Containers/PostBlock";

function Post() {
	return (
		<PostContainer>
			<PostBlock>
				<h1 className={styles["post-title"]}>Blog Title</h1>
				<p className={styles["post-body"]}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Similique itaque modi nesciunt sunt natus sed temporibus saepe
					sequi vero tenetur. Aut quo hic quam eius recusandae vero,
					possimus illum maxime odio doloremque esse voluptas nesciunt,
					optio corporis soluta sint officia, suscipit rerum doloribus
					dicta ipsum ducimus ea eveniet quidem? Provident. quis.
				</p>
				<h4 className={styles["post-author"]}>@Author</h4>
				<div className={styles.react}>
					<div>
						<span>
							<i className="fa-solid fa-heart"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-thumbs-up"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-face-flushed"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-face-surprise"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-face-grin-stars"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-face-grin-squint-tears"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-face-sad-cry"></i>
							<p>1</p>
						</span>
						<span>
							<i className="fa-solid fa-ghost"></i>
							<p>1</p>
						</span>
					</div>
					<span>
						<i className="fa-solid fa-trash"></i>
					</span>
				</div>
			</PostBlock>
		</PostContainer>
	);
}

export default Post;
