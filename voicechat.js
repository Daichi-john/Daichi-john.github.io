navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;
var connectedCall;

var peer = new Peer({ key: 'b4076f52-abd6-4c5e-850d-5a1c18252d56', debug: 3});
 
peer.on('open', function(){
    // 自分のIDを表示する
    // - 自分のIDはpeerオブジェクトのidプロパティに存在する
    // - 相手はこのIDを指定することで、通話を開始することができる
    $('#my-id').text(peer.id);
});
 
peer.on('call', function(call){
  　
    connectedCall = call;
 
    $("#peer-id").text(call.peer);
 
    call.answer(localStream);
 
    call.on('stream', function(stream){
 
        var url = URL.createObjectURL(stream);
 
        $('#peer-video').prop('src', url);
    });
});
 
$(function() {
 
    navigator.getUserMedia({audio: true, video: false}, function(stream){
 
        localStream = stream;
 
    }, function() { alert("Error!"); });
 
    $('#call-start').click(function(){
 
        var peer_id = $('#peer-id-input').val();
 
        var call = peer.call(peer_id, localStream);
            
        call.on('stream', function(stream){

            $("#peer-id").text(call.peer);
 
            var url = URL.createObjectURL(stream);
 
            $('#peer-video').prop('src', url);
        });
    });
 
    $('#call-end').click(function(){

        connectedCall.close();
    });
});