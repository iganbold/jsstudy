importScripts('../../bower_components/bucketsjs/dist/buckets.min.js');
importScripts('../../bower_components/vis/dist/vis.js');

onmessage = function(e) {
    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
    var minHeap =new buckets.Heap((a,b)=> {
        if(a.w < b.w) 
            return -1;
          else if(a.w > b.w) 
            return 1; 
          else 
            return 0;
    });
    
    var countRepeatMap =new Map();
        
    //counting the number of apperance
    for(var i=0 ; i < e.data.length;i++) {
      if(countRepeatMap.has(e.data[i]))
      {
        countRepeatMap.set(e.data[i],(countRepeatMap.get(e.data[i])+1));
      } else {
        countRepeatMap.set(e.data[i],1);
      }
    }
    
    //adds to the heap
    countRepeatMap.forEach((v,k)=> minHeap.add({
          sym: k,
          w: v
    }));
    
    //generate huffman tree, and create graph nodes and edges
        while(!minHeap.isEmpty()) {
          
          var a = minHeap.removeRoot();
          
          if(minHeap.isEmpty()) 
          {
            // console.log("Nodes:");
            // console.log(nodes.get());  
            postMessage([a,nodes.get(),edges.get()]);
            break;
          }
          
          var b = minHeap.removeRoot();
          var c = {};
          
          if(a.sym.length == 1)
          {
            var nodea = {
              id: a.sym,
              label: a.sym,
              color: {background:'#FFEB3B', border: "#FBC02D"}
            };  
          } else {
            var nodea = {
              id: a.sym,
              label: a.w,
              w: a.w
            };
          }
          
          if(b.sym.length == 1)
          {
            var nodeb = {
              id: b.sym,
              label: b.sym,
              color: {background:'#FFEB3B',border: "#FBC02D"}
            };  
          } else {
            var nodeb = {
              id: b.sym,
              label: b.w,
              w: b.w
            };
          }
          
          var ncid = a.sym+""+b.sym;
          var nclable = a.w+b.w;
          var ncw = a.w+b.w;
          
          var nodec = {
            id: ncid,
            label: nclable,
            w: ncw
          };
          
          nodes.update(nodea);
          nodes.update(nodeb);
          nodes.update(nodec);
          
          var edge1 = {};
          var edge2 = {};
          
          edge1.from = nodea.id;
          edge1.to = nodec.id;

          edge2.from = nodeb.id;
          edge2.to = nodec.id;
          edge2.label = "1";
          
          if(a.w <= b.w) {
            c.l = a;
            c.r = b;
            edge1.label = "0";
            edge2.label = "1";
          } else {
            c.l = b;
            c.r = a;
            edge1.label = "1";
            edge2.label = "0";
          }
          
          edges.add(edge1);
          edges.add(edge2);
          
          c.w = (a.w + b.w);
          c.sym = a.sym + b.sym;
          minHeap.add(c);
        }
    }
      