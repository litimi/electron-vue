<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" style="height: 460px;position:relative;">
        <div class="view">
          <div class="left-side">
            <div class="control">
              <div class="o-btns">
                <button class="play-type">单曲循环</button>
                <button class="add-music">本地歌曲</button>
                <input type="file" class="music-file" accept="audio/mp3" multiple="true"/>
                <button class="muti">静音</button>
              </div>
            </div>

            <div class="music-contain">
              <ul class="music-list"></ul>
            </div>
          </div>

          <div class="right-side">
            <audio preload autoplay class="music-player"></audio>
            <canvas id="cas" width="500" height="460"></canvas>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Mymusic',
  data() {
    return {
      // musics: [
      //   {
      //     name: "Fate Stay Night",
      //     src: "music2.mp3"
      //   }
      // ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
      var canvas = document.getElementById("cas");
      var ctx = canvas.getContext("2d");
      var outcanvas = document.createElement("canvas");
      outcanvas.width = canvas.width;
      outcanvas.height = canvas.height / 2;
      var octx = outcanvas.getContext('2d');

      // audioSource 为音频源，bufferSource为buffer源
      var audioSource, bufferSource;

      //实例化音频对象
      var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

      if (!AudioContext) {
        alert("您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试")
        return;
      }

      var AC = new AudioContext();

      // analyser为analysernode，具有频率的数据，用于创建数据可视化
      var analyser = AC.createAnalyser();

      // gain为gainNode，音频的声音处理模块
      var gainnode = AC.createGain();
      gainnode.gain.value = 1;

      //计时器
      var RAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      //播放音乐
      var audio = $(".music-player")[0];

      var musics = [{
        name: "Fate Stay Night",
        src: "static/mp3/music2.mp3"
      }, {
        name: "Two Steps From Hell",
        src: "static/mp3/music.mp3"
      }];
      var nowIndex = 0;   //当前播放到的音乐索引
      var singleLoop = false; //是否单曲循环

      var app = {
        init: function() {
          this.render(musics);

          this.bind();

          this.trigger(0);
        },

        bind: function() {
          var that = this;

          audio.onended = function() {
            app.trigger(singleLoop ? nowIndex : (nowIndex + 1));
          };

          $(".play-type").on("click", function() {
            singleLoop = !singleLoop;
            $(this).html(singleLoop ? "列表循环" : "单曲循环");
          });

          //静音按钮
          $(".muti").on('click', function() {
            var ismuti = !!gainnode.gain.value;
            gainnode.gain.value = ismuti ? 0 : 1;
            $(this).html(ismuti ? "取消静音" : "静音");
          });

          $(".add-music").on('click', function() {
            $('.music-file').click();
          });

          $(".music-list").on("click", "li", function() {
            var index = $(".music-list li").index($(this));
            that.trigger(index);
          });

          //如果用户选取了自己的音乐则通过filereader读取
          $('.music-file').on('change', function() {
            if (this.files.length == 0) return;

            var files = Array.prototype.slice.call(this.files);

            files.forEach(function(file) {
              var fr = new FileReader();
              fr.readAsArrayBuffer(file);
              var mdata = {
                name: file.name.substring(0, file.name.lastIndexOf('.')),
                buffer: null,
                decoding: true
              };

              musics.push(mdata);

              fr.onload = function(e) {
                decodeBuffer(e.target.result, function(buffer) {
                  mdata.buffer = buffer;
                  mdata.decoding = false;
                  $(".music-list li").eq(musics.indexOf(mdata)).html(mdata.name);
                })
              };
            });

            that.render(musics);
          });
        },

        trigger: function(index) {
          index = index >= musics.length ? 0 : index;

          if (musics[index].decoding)return;

          this.stop();

          nowIndex = index;

          $(".music-list li").eq(index).addClass("playing").siblings().removeClass("playing");

          if (musics[index].src) {
            chooseMusic(musics[index].src);
          } else if (musics[index].buffer) {
            playMusic(musics[index].buffer);
          }
        },

        stop: function() {
          var ismuti = !!gainnode.gain.value;

          if (!ismuti) {
            gainnode.gain.value = 0;
          }

          if (!audio.ended || !audio.paused) audio.pause();

          if (bufferSource && ('stop' in bufferSource)) bufferSource.stop();

          try {
            if (bufferSource) {
              bufferSource.disconnect(analyser);
              bufferSource.disconnect(AC.destination);
            }

            if (audioSource) {
              audioSource.disconnect(analyser);
              audioSource.disconnect(AC.destination);
            }
          } catch (e) {
          }

          if (!ismuti) {
            gainnode.gain.value = 1;
          }
        },

        render: function(musics) {
          var html = "";
          var music;
          for (var i = 0; i < musics.length; i++) {
            music = musics[i];
            html += '<li title="' + music.name + '">' + (music.decoding ? "解码中..." : music.name) + '</li>';
          }
          $(".music-list").html(html);
          $(".music-list li").eq(nowIndex).addClass("playing");
        }
      };

      //选择audio作为播放源
      function chooseMusic(src) {
        audio.src = src;
        audio.load();
        playMusic(audio);
      }

      //对音频buffer进行解码
      function decodeBuffer(arraybuffer, callback) {
        AC.decodeAudioData(arraybuffer, function(buffer) {
          callback(buffer);
        }, function(e) {
          alert("文件解码失败")
        })
      }

      //音频播放
      function playMusic(arg) {
        var source;
        //如果arg是audio的dom对象，则转为相应的源
        if (arg.nodeType) {
          audioSource = audioSource || AC.createMediaElementSource(arg);
          source = audioSource;
        } else {
          bufferSource = AC.createBufferSource();

          bufferSource.buffer = arg;

          bufferSource.onended = function() {
            app.trigger(singleLoop ? nowIndex : (nowIndex + 1));
          };

          //播放音频
          setTimeout(function() {
            bufferSource.start()
          }, 0);

          source = bufferSource;
        }

        //连接analyserNode
        source.connect(analyser);

        //再连接到gainNode
        analyser.connect(gainnode);

        //最终输出到音频播放器
        gainnode.connect(AC.destination);
      }

      //绘制音谱的参数
      var rt_array = [],	//用于存储柱形条对象
        rt_length = 30;		//规定有多少个柱形条

      var grd = ctx.createLinearGradient(0, 110, 0, 270);
      grd.addColorStop(0, "red");
      grd.addColorStop(0.3, "yellow");
      grd.addColorStop(1, "#00E800");

      function showTxt(msg) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "20px 微软雅黑";
        ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
        ctx.restore();
      }

      //动画初始化，获取analyserNode里的音频buffer
      function initAnimation() {
        //每个柱形条的宽度，及柱形条宽度+间隔
        var aw = canvas.width / rt_length;
        var w = aw - 5;

        for (var i = 0; i < rt_length; i++) {
          rt_array.push(new Retangle(w, 5, i * aw, canvas.height / 2))
        }

        animate();
      }

      function animate() {
        if (!musics[nowIndex].decoding) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          octx.clearRect(0, 0, canvas.width, canvas.height);

          //出来的数组为8bit整型数组，即值为0~256，整个数组长度为1024，即会有1024个频率，只需要取部分进行显示
          var array_length = analyser.frequencyBinCount;
          var array = new Uint8Array(array_length);
          analyser.getByteFrequencyData(array);	//将音频节点的数据拷贝到Uin8Array中

          //数组长度与画布宽度比例
          var bili = array_length / canvas.width;

          for (var i = 0; i < rt_array.length; i++) {
            var rt = rt_array[i];
            //根据比例计算应该获取第几个频率值，并且缓存起来减少计算
            rt.index = ('index' in rt) ? rt.index : ~~(rt.x * bili);
            rt.update(array[rt.index]);
          }

          draw();
        } else {
          showTxt("音频解码中...")
        }

        RAF(animate);
      }

      //制造半透明投影
      function draw() {
        ctx.drawImage(outcanvas, 0, 0);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI);
        ctx.scale(-1, 1);
        ctx.drawImage(outcanvas, -canvas.width / 2, -canvas.height / 2);
        ctx.restore();
        ctx.fillStyle = 'rgba(0, 0, 0, .8)';
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
      }

      // 音谱条对象
      function Retangle(w, h, x, y) {
        this.w = w;
        this.h = h; // 小红块高度
        this.x = x;
        this.y = y;
        this.jg = 3;
        this.power = 0;
        this.dy = y; // 小红块位置
        this.num = 0;
      }

      var Rp = Retangle.prototype;

      Rp.update = function(power) {
        this.power = power;
        this.num = ~~(this.power / this.h + 0.5);

        //更新小红块的位置，如果音频条长度高于红块位置，则红块位置则为音频条高度，否则让小红块下降
        var nh = this.dy + this.h;//小红块当前位置
        if (this.power >= this.y - nh) {
          this.dy = this.y - this.power - this.h - (this.power == 0 ? 0 : 1);
        } else if (nh > this.y) {
          this.dy = this.y - this.h;
        } else {
          this.dy += 1;
        }

        this.draw();
      };

      Rp.draw = function() {
        octx.fillStyle = grd;
        var h = (~~(this.power / (this.h + this.jg))) * (this.h + this.jg);
        octx.fillRect(this.x, this.y - h, this.w, h);
        for (var i = 0; i < this.num; i++) {
          var y = this.y - i * (this.h + this.jg);
          octx.clearRect(this.x - 1, y, this.w + 2, this.jg);
        }
        octx.fillStyle = "#950000";
        octx.fillRect(this.x, ~~this.dy, this.w, this.h);
      };

      app.init();
      initAnimation();
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

input, button {
  outline: none !important;
  border-width: 1px !important;
}

a {
  text-decoration: none !important;
  outline: none !important;
}

li {
  list-style-type: none !important;
}

button {
  padding: 5px 10px !important;
  border: 1px solid #000 !important;
  background-color: transparent !important;
  border-radius: 1000px !important;
  cursor: pointer !important;
}

// html, body {
//   height: 100%;
// }

// body {
//   background-color: #000;
// }

.view {
  height: 100% !important;
  overflow: hidden !important;
  white-space: nowrap !important;
}

.left-side {
  position: absolute !important;
  z-index: 3 !important;
  width: 260px !important;
  height: 100% !important;
  left: 0 !important;
  top: 0 !important;
  color: rgba(255, 255, 255, .4) !important;
  background-color: rgba(255, 255, 255, .1) !important;
}

/*控制按钮群*/
.control {
  height: 65px !important;
  overflow: hidden !important;
}

.o-btns {
  margin-top: 20px !important;
  text-align: center !important;
}

.o-btns button {
  width: 74px !important;
  color: #fff !important;
  border-color: #fff !important;
}

.o-btns input[type='file'] {
  display: none !important;
}

/*音乐列表*/
.music-contain {
  position: absolute !important;
  width: 100% !important;
  bottom: 0 !important;
  top: 65px !important;
  overflow: auto !important;
}

.music-list li{
  display: block !important;
  height: 40px !important;
  line-height: 40px !important;
  padding: 5px 10px !important;
  cursor: pointer !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  font-family: "微软雅黑" "宋体";
  -webkit-transition: background-color .3s, padding .3s !important;
  transition: background-color .3s, padding .3s !important;
}

.music-list li:hover {
  padding-left: 20px !important;
  color: #fff !important;
}

.music-list li.playing {
  color: #fff !important;
  padding-left: 10px !important;
  background-color: #000 !important;
}

.right-side {
  position: relative !important;
  margin-left: 260px !important;
  height: 100% !important;
}

#cas {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  margin: auto !important;
  background: #000 !important;
}

.music-player {
  visibility: hidden !important;
}

</style>