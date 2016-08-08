/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PostItem = require('./PostItem');

var ProjectPostsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        return {
            loading: store.loading,
            posts: store.getProjectPosts(this.props.projectId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        item: {
            marginTop: 10
        }

    },

    render: function(){
        var list = this.state.posts;
        console.log('ProjecPostsList: render: list = ', list);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(post, k){
                        var key = this.props.projectId + '_post_' + post.id;

                        return(
                            <div style={this.componentStyle.item} key={key}>
                                <PostItem postId={post.id} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = ProjectPostsList;