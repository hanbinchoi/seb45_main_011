package com.growstory.domain.board.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.images.entity.BoardImage;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isConnection;


    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @OneToOne
    @JoinColumn(name = "LEAF_ID")
    private Leaf leaf;

    @OneToMany(mappedBy = "board")
    private List<Comment> boardComments = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardImage> boardImages = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<Board_HashTag> boardHashTags;

    public void addBoardLike(BoardLike boardLike) {
        boardLikes.add(boardLike);
    }
}
